const Post = require('./models/Post.model');


const resolvers = {
    Query : {
        hello:  ()=> {
            return 'Hello world';
        },
        getAllPosts: async () =>{
           return await Post.find();
        },
        getPost: async (_parent, {id},_context,_info)=>{
             return await Post.findById(id);
        }
    },
    Mutation : {
        createPost: async (parent, args, context , info) => {

               const {title, description} = args.post;
               console.log(title, description);
               const post = new Post({title, description});
               await post.save();
               return post;
        },
        deletePost: async (parent, args, context , info) => {
            const {id} = args;
            await Post.findByIdAndDelete(id);
            return "Post is deleted"
        },
        updatePost: async (parent, args, context , info) => {
            const {id} = args;
            const {title, description} = args.post;
            const updates = {}
            if(title !== undefined){
                updates.title = title;
            }
            if(description !== undefined){
                updates.description = description; 
            }
            const deletedpost = await Post.findByIdAndUpdate(id,updates,
                {new : true})
                return deletedpost;
        },
    },

};

module.exports = resolvers;