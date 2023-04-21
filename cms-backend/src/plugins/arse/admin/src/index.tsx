import React from 'react';
import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import { useIntl } from 'react-intl';
import getTrad from './utils/getTrad';

const name = pluginPkg.strapi.name;

const myComponent = async () => {
  const component = await import(
     /* webpackChunkName: "users-providers-settings-page" */ './pages/App'
  );

  return component;
}

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: name,
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

        return component;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });

    app.createSettingSection(
      { id: pluginId, intlLabel: {id: getTrad('plugin.name'), defaultMessage: 'ARSE - AR Shopping Experience'} },
      [
        {
          intlLabel: {id: getTrad('plugin.name'), defaultMessage: 'ARSE - AR Shopping Experience'},
          id: 'settings',
          to: `/settings/${pluginId}/seo`,
          Component: myComponent,
          permissions: [],
        }
      ]
    );

    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };
    app.registerPlugin(plugin);
  },

  bootstrap(app) {},
  async registerTrads(app) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      locales.map(locale => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
