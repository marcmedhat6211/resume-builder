import { ICertificate } from "@/interfaces/certificate";
import { ISection } from "@/interfaces/section";

export interface ICertificatesSection extends ISection {
  certificates: ICertificate[];
}
