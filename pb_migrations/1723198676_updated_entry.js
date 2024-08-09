/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c3vihh2lhbo0gfe")

  // remove
  collection.schema.removeField("hywov0ya")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c3vihh2lhbo0gfe")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
