'use strict';

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
    // Grant read-only permissions to the public role for artists, paintings, and categories.
    const grantPublicPermissions = async () => {
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
        populate: ['permissions'],
      });

      if (!publicRole) {
        console.error("Public role not found.");
        return;
      }

      const permissionsToGrant = [
        'api::artist.artist.find',
        'api::artist.artist.findOne',
        'api::painting.painting.find',
        'api::painting.painting.findOne',
        'api::category.category.find',
        'api::category.category.findOne',
      ];

      const allPermissions = await strapi.db.query('plugin::users-permissions.permission').findMany({
          where: {
              action: { $in: permissionsToGrant }
          }
      });

      const permissionsToConnect = allPermissions.filter(permission => {
        return !publicRole.permissions.some(granted => granted.id === permission.id);
      });

      if (permissionsToConnect.length > 0) {
        await strapi.db.query('plugin::users-permissions.role').update({
            where: { id: publicRole.id },
            data: {
                permissions: {
                    connect: permissionsToConnect.map(p => p.id)
                }
            }
        });
        console.log('Successfully granted public read permissions.');
      }
    };

    try {
      await grantPublicPermissions();
    } catch (error) {
      console.error('Could not grant public permissions:', error);
    }
  },
};
