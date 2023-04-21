
export const floorplan = {
  "kind": "collectionType",
  "collectionName": "floorplans",
  "info": {
    "singularName": "floorplan",
    "pluralName": "floorplans",
    "displayName": "Floorplan"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string"
    },
    "description": {
      "type": "text"
    },
    "image": {
      "allowedTypes": [
        "images",
        "files"
      ],
      "type": "media",
      "multiple": false,
      "required": true
    }
  }
}
