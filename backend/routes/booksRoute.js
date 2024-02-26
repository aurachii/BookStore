import express from 'express';
import { Book } from '../models/bookModel.js';

const router= express.Router();

//Save a new book
router.post('/',async(request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author
        ) {
            return response.status(400).send(
                {message: 'Please fill up all requested fields',}
            );
        }
        const newBook={
            title: request.body.title,
            author: request.body.author
        };

        const book=await Book.create(newBook);
        return response.status(201).send(book);
    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }

});

//get all books

router.get('/',async (request,response)=>{
    try {
        const books= await Book.find({});
        return response.status(200).json(
            {
                count: books.length,
                data: books
            }
        );

    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Get books by id

router.get('/:id',async (request,response)=>{
    try {
        const { id }=request.params;
        const book= await Book.findById(id);
        return response.status(200).json(book);

    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Updating a book
router.put('/:id',async (request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author
        ){ 
            return response.status(400).send(
                {message: 'Please fill up all requested fields'});

        }

        const { id }=request.params;

        const result= await Book.findByIdAndUpdate(id,request.body);

        if(!result){
            return response.status(404).json({message: 'Book not Found'});
        }
        return response.status(200).send({message: 'Book Updated Succesfully'});

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});
// Route for deleting a book
router.delete('/:id',async (request,response)=>{
    try{
        const { id }=request.params;

        const result= await Book.findByIdAndDelete(id);

        if (!result){
            return response.status(404).json({message: 'Book not Found'});      
        }
        return response.status(200).send({message: 'Book Deleted Succesfully'});

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;
