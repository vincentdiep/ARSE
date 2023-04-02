import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  // bootstrap phase
  console.log('hello from server bootstrap');
};
