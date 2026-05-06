import { type SchemaTypeDefinition } from "sanity";
import { contentBlockType } from "./objects/contentBlock";
import { pageType } from "./documents/page";
import { industryTrendsPageType } from "./documents/industryTrendsPage";
import { homepageType } from "./documents/homepage";
import { contactPageType } from "./documents/contactPage";
import { dataAssetsPageType } from "./documents/dataAssetsPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    contentBlockType,
    pageType,
    industryTrendsPageType,
    homepageType,
    contactPageType,
    dataAssetsPageType,
  ],
};
