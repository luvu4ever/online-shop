import { MongoClient, ServerApiVersion } from 'mongodb';
import fetch from 'node-fetch'
import mongo from 'mongodb'
// const {MongoClient, ServerApiVersion} = require('mongodb')
// const fetch = require("node-fetch")
// const mongo = require('mongodb')

const uri = "mongodb+srv://root123:gOLxvl1USLjtj9mI@cluster0.ovcchkf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {

        HandleCmdArgs();


    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function HandleCmdArgs() {
    await client.connect();
    await client.db("ECommerce").command({ ping: 1 });
    // Send a ping to confirm a successful connection
    //await client.db("ECommerce").command({ ping: 1 });
    let argList = process.argv;

    const response = await fetch(process.argv[process.argv.length - 1]);
    const data = await response.json();

    let cmd = argList[2];
    if (cmd == "update") {
        let productID = argList[3];

        let attrDetailCol = client.db("ECommerce").collection("attr_detail");
        let attrShortCol = client.db("ECommerce").collection("attr_short")
        let variantCol = client.db("ECommerce").collection("variants")

        const filter = { product: new mongo.ObjectId(productID) }

        let productAttr = data.datas.model.product.productAttributes.map(x => {
            return {
                group: x.groupName,
                name: x.attributeName,
                value: x.specName
            }
        });
        let productAttrShort = data.datas.model.product.listAttrDetailShort.map(x => {
            return {
                name: x.attributeName,
                value: x.specName
            }
        })

        let listVariantId = data.datas.model.product.listProductVariant.map(x => x.id)
        let listColorName = data.datas.model.product.listProductVariant.map(x => x.id);

        for (let id in listVariantId) {

        }
        for (let i = 0; i < listVariantId.length; i++) {
            const id = listVariantId[i];
            const colorName = listColorName[i];

            const response = await fetch(`https://fptshop.com.vn/apiFPTShop/Product/GetGalleryByProductVariantId?id=${id}&sku=00904366&s=b9003f0ebb720ed60e1df6294333ddb270f0f082f222e8ed4bdebccdbda8f5e0`);
            const data = await response.json();
            let listUrl = datas.pictures.url.map(x => x.url);

            const variantFilter = {
                product: new mongo.ObjectId(productID),
                variant_name: colorName
            }

            const variantUpdater = {
                $set: {
                    gallery: listUrl,
                }
            }

            await variantCol.updateOne(variantFilter, variantUpdater);
        }

        console.log(productAttr);
        const attrDetailUpdater = {
            $set: {
                list_attr: productAttr
            }
        }
        const attrShortUpdater = {
            $set: {
                list_attr: productAttrShort
            }
        }
        await attrDetailCol.updateOne(filter, attrDetailUpdater);
        await attrShortCol.updateOne(filter, attrShortUpdater)
    }

    else if (cmd == "add") {
        let category = argList[3];

        let attrDetailCol = client.db("ECommerce").collection("attr_detail");
        let attrShortCol = client.db("ECommerce").collection("attr_short")
        let variantCol = client.db("ECommerce").collection("variants")
        let colorCol = client.db("ECommerce").collection("colors")
        let productCol = client.db("ECommerce").collection("products")

        let productID;
        console.log(argList[4][0] != "-");
        if (argList[4][0] != "-") {
            const insertProductOp = await productCol.insertOne({ category: category, brand:data.datas.model.product.brand.name });
            productID = insertProductOp.insertedId;
        }
        else{
            productID = new mongo.ObjectId(argList[4].slice(1));
        }

        const filter = { product: productID }

        let productAttr = data.datas.model.product.productAttributes.map(x => {
            return {
                group: x.groupName,
                name: x.attributeName,
                value: x.specName
            }
        });
        let productAttrShort = data.datas.model.product.listAttrDetailShort.map(x => {
            return {
                name: x.attributeName,
                value: x.specName
            }
        })

        let listVariantId = data.datas.model.product.listProductVariant.map(x => x.id)
        let listPrice = data.datas.model.product.listProductVariant.map(x => x.price);
        let listColorName = data.datas.model.product.listProductVariant.map(x => x.colorName ?? "");
        let productName = data.datas.model.product.name;
        let variantName = data.datas.model.productGroup?.storage ?? "";
        console.log(listVariantId);
        console.log(listColorName);
        console.log(productName)
        console.log(variantName);

        const variantData = {
            product: productID,
            full_name: productName,
            short_name: variantName,
        }
        console.log(variantData);
        const insertVariantOp = await variantCol.insertOne(variantData);
        const insertedID = insertVariantOp.insertedId;

        for (let i = 0; i < listVariantId.length; i++) {
            const id = listVariantId[i];
            const colorName = listColorName[i];

            const response = await fetch(`https://fptshop.com.vn/apiFPTShop/Product/GetGalleryByProductVariantId?id=${id}&sku=00904366&s=b9003f0ebb720ed60e1df6294333ddb270f0f082f222e8ed4bdebccdbda8f5e0`);
            const data = await response.json();
            let listUrl = data.datas.pictures.map(x => x.url);
            let price = data.datas.olpProduct?.price ?? listPrice[i];

            const insertData = {
                price: price,
                name: colorName,
                price: price,
                variant: insertedID,
                gallery: listUrl
            }
            console.log(insertData);
            const insertColorOp = await colorCol.insertOne(insertData);
        }

        const attrDetailData = {
            variant: insertedID,
            list_attr: productAttr
        }
        const attrShortData = {
            variant: insertedID,
            list_attr: productAttrShort
        }
        await attrDetailCol.insertOne(attrDetailData)
        await attrShortCol.insertOne(attrShortData)
    }
}

run().catch(console.dir);
