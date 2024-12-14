import { IPersonalDetailsSection } from "@/interfaces/personalDetailsSection";
import { ContactDetailsSection } from "@/models/contactDetailsSection";

export const PersonalDetailsSection: IPersonalDetailsSection = {
  firstName: "Random",
  lastName: "Person",
  email: "someone@example.com",
  phone: "+201xxxxxxxxx",
  country: "Canada",
  city: "Ontario",
  jobTitle: "Software Engineer",
  summary:
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet",
  contactDetails: ContactDetailsSection,
};
