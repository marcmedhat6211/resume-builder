import { ICertificatesSection } from "@/interfaces/certificatesSection";
import { Certificate } from "@/models/certificate";

export const CertificatesSection: ICertificatesSection = {
  title: "Certificates",
  sortNo: 3,
  certificates: [Certificate],
};
