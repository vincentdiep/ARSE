'use strict';

/**
 * floorplan service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::floorplan.floorplan');
