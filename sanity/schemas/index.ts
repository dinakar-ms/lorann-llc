import { type SchemaTypeDefinition } from "sanity";
import { contentBlockType } from "./objects/contentBlock";
import { richTextType } from "./objects/richText";
import {
  ctaLinkType,
  statType,
  featureItemType,
  featureGridSectionType,
  ctaBannerType,
  teamMemberType,
  caseStudyType,
  proseSectionType,
  faqItemType,
} from "./objects/templateObjects";
import {
  healthcareFeaturesSectionType,
  healthcareComplianceSectionType,
} from "./objects/healthcareSectionTypes";
import { pageType } from "./documents/page";
import { industryTrendsPageType } from "./documents/industryTrendsPage";
import { homepageType } from "./documents/homepage";
import { contactPageType } from "./documents/contactPage";
import { dataAssetsPageType } from "./documents/dataAssetsPage";
import { aboutPageType } from "./documents/aboutPage";
import { howItWorksPageType } from "./documents/howItWorksPage";
import { industriesPageType } from "./documents/industriesPage";
import { solutionsPageType } from "./documents/solutionsPage";
import { insightsPageType } from "./documents/insightsPage";
import { signalExchangePageType } from "./documents/signalExchangePage";
import { resourcesPageType } from "./documents/resourcesPage";
import { contactSubmissionType } from "./documents/contactSubmission";
import { popupLeadSubmissionType } from "./documents/popupLeadSubmission";
import { userType } from "./documents/user";
import { dataCardSubmissionType } from "./documents/dataCardSubmission";
import { dataCardType } from "./documents/dataCard";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    contentBlockType,
    richTextType,
    ctaLinkType,
    statType,
    featureItemType,
    featureGridSectionType,
    ctaBannerType,
    teamMemberType,
    caseStudyType,
    proseSectionType,
    faqItemType,
    healthcareFeaturesSectionType,
    healthcareComplianceSectionType,
    pageType,
    industryTrendsPageType,
    homepageType,
    contactPageType,
    dataAssetsPageType,
    aboutPageType,
    howItWorksPageType,
    industriesPageType,
    solutionsPageType,
    insightsPageType,
    signalExchangePageType,
    resourcesPageType,
    contactSubmissionType,
    popupLeadSubmissionType,
    dataCardType,
    userType,
    dataCardSubmissionType,
  ],
};
