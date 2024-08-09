/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c3vihh2lhbo0gfe")

  // remove
  collection.schema.removeField("k5ygruof")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7dmcpghp",
    "name": "text",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c3vihh2lhbo0gfe")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("7dmcpghp")

  return dao.saveCollection(collection)
})
