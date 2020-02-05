
import_data.xlsx => remove hindi tag and curly braces from data.json
mongoimport --db chatbotDB --collection disease --file data.json --jsonArray
