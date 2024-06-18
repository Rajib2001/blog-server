import { response } from "express";
import Post from "../model/post.js"



export const createPost=async(request,response)=>{

    try {
        const post= await new Post(request.body)
        post.save();
        return response.status(200).json({
            msg:"Post saved Successfully"
        })
        
    } catch (error) {
        return response.status(500).json({msg:"Error while saving post..",error})
        
    }
    
}


export const getAllPosts=async(request,response)=>{
    let category = request.query.category;
    let posts;
    try {
        if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});

        return response.status(200).json(posts);
    } catch (error) {
        return response.status(500).json({msg:"Error in getting all posts",error})
        
    }
}


export const getPost=async(request,response)=>{
    try {
        const post=await Post.findById(request.params.id)

        return response.status(200).json(post);
        
    } catch (error) {
        return response.status(500).json({msg:"Error while getting single post",error})
        
        
    }
}

export const updatePost=async(request,response)=>{
    try {
        const post=await Post.findById(request.params.id)
        if(!post){
            return response.status(404).json({msg:"post not found..!!"})
        }
        await Post.findByIdAndUpdate(request.params.id,{$set:request.body})
        return response.status(200).json({msg:'Post updated successfully.'})
    } catch (error) {
        return response.status(500).json({msg:"Error while updating post",error})
    }
}


export const deletePost=async(request,response)=>{
    try {
      
        const post=await Post.findById(request.params.id)
         if(!post){
            return response.status(404).json({msg:"post not found"})
         }
       await Post.findByIdAndDelete(request.params.id)
        return response.status(200).json({msg:"Post deleted successfully"})
        
    } catch (error) {
        return response.status(500).json({mgs:'Error while deleting post',error})
        
    }
}