'use strict';

async function grantPublicPermissions(strapi) {
  // Find the 'public' role
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
    populate: ['permissions']
  });

  if (!publicRole) {
    console.error("Could not find the 'public' role.");
    return;
  }

  // Define the permissions to grant for each content type
  const permissionsToGrant = [
    'api::artist.artist.find',
    'api::artist.artist.findOne',
    'api::painting.painting.find',
    'api::painting.painting.findOne',
    'api::category.category.find',
    'api::category.category.findOne',
  ];

  // Find all permission objects that match the actions we want to grant
  const allPermissions = await strapi.db.query('plugin::users-permissions.permission').findMany({
      where: {
          action: { $in: permissionsToGrant }
      }
  });

  // Get the IDs of the permissions to add
  const permissionIdsToAdd = allPermissions.map(p => p.id);
  const existingPermissionIds = publicRole.permissions.map(p => p.id);
  const finalPermissionIds = [...new Set([...existingPermissionIds, ...permissionIdsToAdd])];


  // Update the public role with the new permissions
  await strapi.db.query('plugin::users-permissions.role').update({
      where: { id: publicRole.id },
      data: {
          permissions: finalPermissionIds,
      },
  });

  console.log("Successfully granted read-only permissions to the public role.");
}


module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // This will grant read-only access to the public role for our content types
    // It runs every time the server starts, ensuring the permissions are set.
    await grantPublicPermissions(strapi);
  },
};
