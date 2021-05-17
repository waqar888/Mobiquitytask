// Mobiquity QA Task Testing

describe ('Mobiquity QA Task', function() {
    it("Hit Users Api and Validate:Response & Status Code ", function()
    {

        cy.request({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/users',
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
            
        })

        })

    it("Search for the user with username “Delphine”", function()
        {
    
            cy.request({
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/users?username=Delphine',
            })
            .then((response) => {
               expect(response.status).to.eq(200)
               expect(response.body).to.not.be.null
               expect(response.body[0].username).equal('Delphine')
               
         })
    
         })
         const validateEmail = (email) => {
            var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return re.test(email);
            }
    it("Fetch the posts written by the User”", function()
         {
     
             cy.request({
                method: 'GET',
                 url: 'https://jsonplaceholder.typicode.com/posts?userId=9',
             })
             .then((response) => {
                 expect(response.status).to.eq(200)
                 expect(response.body).to.not.be.null
                expect(response.body[0].userId).to.eq(9)
                 let posts=response.body
                 posts.forEach(element => {
               cy.request({
                   method: 'GET',
                   url: `https://jsonplaceholder.typicode.com/comments?postId=${element.id}`,
              })
              .then((response) => {
                  expect(response.status).to.eq(200)
                  expect(response.body).to.not.be.null
                  expect(response.body[0].postId).to.eq(element.id)
                  let comments=response.body
                  comments.forEach(index => {
                    const emailState = validateEmail(index.email)
                    if(emailState){
                        cy.log('Email is in Proper Format')
                   }else{
                        cy.log('Email is in Wrong Format: '+index.email)
                   }
                      
                  });
     

           })
      
                 });
          })
     
        })


      })