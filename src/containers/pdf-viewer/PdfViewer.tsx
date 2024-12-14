import { IResume } from "@/interfaces/resume";
import { FC, useState, useEffect, useCallback } from "react";
import { Document, Page } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import jsPDF from "jspdf";
import "@/utils/pdfjs-worker";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

type Props = {
  data: IResume;
};

const PdfViewer: FC<Props> = ({ data }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("Error loading PDF:", error);
    setError(error.message);
    setLoading(false);
  };

  const generatePDF = useCallback(() => {
    try {
      const doc = new jsPDF({
        unit: "mm",
        format: "a4",
      });

      const pageHeight = doc.internal.pageSize.height;
      const margin = 20;
      const contentWidth = doc.internal.pageSize.width - 2 * margin;
      let yPos = margin;

      const addWrappedText = (text: string, y: number, fontSize: number = 12) => {
        doc.setFontSize(fontSize);
        const lines = doc.splitTextToSize(text, contentWidth);
        const lineHeight = fontSize * 0.3527;
        for (const line of lines) {
          if (y + lineHeight > pageHeight - margin) {
            doc.addPage();
            y = margin;
          }
          doc.text(line, margin, y);
          y += lineHeight;
        }
        return y + 5;
      };

      const addSectionTitle = (title: string, y: number) => {
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        if (y + 8 > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(title, margin, y);
        doc.setFont("helvetica", "normal");
        return y + 8;
      };

      // Personal Details Section
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      yPos = addWrappedText(
        `${data.personalDetailsSection?.firstName || ""} ${data.personalDetailsSection?.lastName || ""}`,
        yPos,
        24
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      if (data.personalDetailsSection?.email) {
        yPos = addWrappedText(data.personalDetailsSection.email, yPos);
      }
      if (data.personalDetailsSection?.phone) {
        yPos = addWrappedText(data.personalDetailsSection.phone, yPos);
      }
      if (data.personalDetailsSection?.contactDetails?.address) {
        yPos = addWrappedText(data.personalDetailsSection?.contactDetails?.address, yPos);
      }
      yPos += 5;

      // Section handlers
      const sectionHandlers = [
        {
          sortNo: data.employmentsSection?.sortNo,
          handler: () => {
            if (data.employmentsSection?.employments?.length) {
              yPos = addSectionTitle(data.employmentsSection.title || "Employment", yPos);
              data.employmentsSection.employments.forEach((emp) => {
                doc.setFontSize(14);
                doc.setFont("helvetica", "bold");
                yPos = addWrappedText(`${emp.position} at ${emp.company}`, yPos, 14);
                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);
                yPos = addWrappedText(emp.date || "", yPos);
                if (emp.description) {
                  yPos = addWrappedText(emp.description, yPos);
                }
                yPos += 5;
              });
            }
          },
        },
        {
          sortNo: data.educationsSection?.sortNo,
          handler: () => {
            if (data.educationsSection?.educations?.length) {
              yPos = addSectionTitle(data.educationsSection.title || "Education", yPos);
              data.educationsSection.educations.forEach((edu) => {
                doc.setFontSize(14);
                doc.setFont("helvetica", "bold");
                yPos = addWrappedText(`${edu?.degree ?? ""} - ${edu?.college ?? ""}`, yPos, 14);
                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);
                yPos = addWrappedText(`${edu?.date ?? ""}`, yPos);
                if (edu?.description) {
                  yPos = addWrappedText(edu.description, yPos);
                }
                yPos += 5;
              });
            }
          },
        },
        {
          sortNo: data.certificatesSection?.sortNo,
          handler: () => {
            if (data.certificatesSection?.certificates?.length) {
              yPos = addSectionTitle(data.certificatesSection.title || "Certificates", yPos);
              data.certificatesSection.certificates.forEach((cert) => {
                doc.setFontSize(14);
                doc.setFont("helvetica", "bold");
                yPos = addWrappedText(cert.name, yPos, 14);
                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);
                if (cert.description) {
                  yPos = addWrappedText(cert.description, yPos);
                }
                yPos += 5;
              });
            }
          },
        },
        {
          sortNo: data.skillsSection?.sortNo,
          handler: () => {
            if (data.skillsSection?.skills?.length) {
              yPos = addSectionTitle(data.skillsSection.title || "Skills", yPos);
              data.skillsSection.skills.forEach((skill) => {
                doc.setFontSize(12);
                doc.setFont("helvetica", "normal");
                yPos = addWrappedText(skill.name, yPos, 12);
              });
              yPos += 5;
            }
          },
        },
        {
          sortNo: data.languagesSection?.sortNo,
          handler: () => {
            if (data.languagesSection?.languages?.length) {
              yPos = addSectionTitle(data.languagesSection.title || "Languages", yPos);
              data.languagesSection.languages.forEach((lang) => {
                doc.setFontSize(12);
                doc.setFont("helvetica", "normal");
                yPos = addWrappedText(`${lang.name} - ${lang.level}`, yPos, 12);
              });
              yPos += 5;
            }
          },
        },
      ];

      sectionHandlers
        .filter((section) => section.sortNo !== undefined)
        .sort((a, b) => (a.sortNo ?? Infinity) - (b.sortNo ?? Infinity))
        .forEach((section) => section.handler());

      return doc;
    } catch (err) {
      console.error("Error generating PDF:", err);
      setError(err instanceof Error ? err.message : "Error generating PDF");
      return null;
    }
  }, [data]);

  const doGenerate = () => {
    try {
      setLoading(true);
      setError(null);
      const doc = generatePDF();
      if (doc) {
        const pdfOutput = doc.output("blob");
        const blob = new Blob([pdfOutput], { type: "application/pdf" });
        setPdfBlob(blob);
      }
    } catch (err) {
      console.error("Error in useEffect:", err);
      setError(err instanceof Error ? err.message : "Error creating PDF");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceFn = setTimeout(() => {
      doGenerate();
    }, 500);

    return () => clearTimeout(debounceFn);
  }, [generatePDF]);

  const handleDownload = () => {
    try {
      const doc = generatePDF();
      if (doc) {
        doc.save("resume.pdf");
      }
    } catch (err) {
      console.error("Error downloading PDF:", err);
      setError(err instanceof Error ? err.message : "Error downloading PDF");
    }
  };

  if (error) {
    return (
      <div className="h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-full h-[calc(100vh-160px)] overflow-auto">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          pdfBlob && (
            <Document
              file={pdfBlob}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              className="w-full h-full flex justify-center"
            >
              <Page
                pageNumber={pageNumber}
                renderTextLayer={false}
                className="shadow-lg"
                width={600}
              />
            </Document>
          )
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
          disabled={pageNumber <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <span className="text-sm">
          Page {pageNumber} of {numPages}
        </span>

        <Button
          variant="outline"
          onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
          disabled={pageNumber >= numPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <Button
        type="button"
        className="mt-3 bg-blue-500 hover:bg-blue-700 text-white"
        onClick={handleDownload}
      >
        <Download className="h-4 w-4" />
        Download
      </Button>
    </div>
  );
};

export default PdfViewer;
