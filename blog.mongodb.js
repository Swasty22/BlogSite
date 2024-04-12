use ('blog')

db.getCollection("content")

db.content.insertMany([
    {
      title: "First Blog",
      description: "This is the first blog description.",
      content: "This is the content of the first blog.",
      price:9

    },
    {
      title: "Second Blog",
      description: "This is the second blog description.",
      content: "This is the content of the second blog.",
      price:21
    },
    {
      title: "Third Blog",
      description: "This is the third blog description.",
      content: "This is the content of the third blog.",
      price:23
    },
    {
      title: "Fourth Blog",
      description: "This is the fourth blog description.",
      content: "This is the content of the fourth blog.",
      price:25
    },
    {
      title: "Fifth Blog",
      description: "This is the fifth blog description.",
      content: "This is the content of the fifth blog.",
      price:20
    },
    {
      title: "Sixth Blog",
      description: "This is the sixth blog description.",
      content: "This is the content of the sixth blog.",
      price:8
    },
    {
      title: "Seventh Blog",
      description: "This is the seventh blog description.",
      content: "This is the content of the seventh blog.",
      price:9
    },
    {
      title: "Eighth Blog",
      description: "This is the eighth blog description.",
      content: "This is the content of the eighth blog.",
      price:10
    },
    {
      title: "Ninth Blog",
      description: "This is the ninth blog description.",
      content: "This is the content of the ninth blog.",
      price:13
    },
    {
      title: "Tenth Blog",
      description: "This is the tenth blog description.",
      content: "This is the content of the tenth blog.",
      price:12
    }
  ]);

//   const fifthBlog = db.content.findOne({title:'Fifth Blog'})
//   console.log(fifthBlog);

  const priceGreaterThanTen = db.content.findOne({price:{$gt:22}})
  console.log(priceGreaterThanTen);
  
