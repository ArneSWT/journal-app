/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "c3vihh2lhbo0gfe",
    "created": "2024-08-09 10:13:53.383Z",
    "updated": "2024-08-09 10:13:53.383Z",
    "name": "entry",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hywov0ya",
        "name": "date",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "k5ygruof",
        "name": "text",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("c3vihh2lhbo0gfe");

  return dao.deleteCollection(collection);
})
