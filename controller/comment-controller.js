import { request } from "http";
import Comment from "../model/comment.js"
import { response } from "express";

export const newComment=async(request,response)=>{
    try {
        const comment=await new Comment(request.body)
        comment.save();

        return response.status(200).json({msg:"Comment post successfully"})
        
    } catch (error) {
        return response.status(500).json({msg:"Error while posting comments",error})
        
    }
}

export const getComments=async(request,response)=>{
    try {
       const comments= await Comment.find({postId:request.params.id})
       return response.status(200).json(comments)
        
    } catch (error) {
        response.status(500).json({msg:"Error while getting all comments"})
        
    }
}

export const deleteComment=async(request,response)=>{
    try {

        await Comment.findByIdAndDelete(request.params.id)
        return response.status(200).json({msg:'Comment deleted successfully'})
        
    } catch (error) {
        return response.status(500).json({msg:"Error while deleting comment",error})
        
    }
}