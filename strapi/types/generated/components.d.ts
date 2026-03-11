import type { Schema, Struct } from '@strapi/strapi';

export interface MenuMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_menu_menu_items';
  info: {
    displayName: '\u041F\u0443\u043D\u043A\u0442\u0438 \u043C\u0435\u043D\u044E ';
    icon: 'bulletList';
  };
  attributes: {
    Link: Schema.Attribute.String & Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'menu.menu-item': MenuMenuItem;
    }
  }
}
