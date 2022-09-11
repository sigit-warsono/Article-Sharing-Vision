<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Post extends ResourceController
{
    protected $modelName = 'App\Models\PostModel';
    protected $format = 'json';

    /**
     * index function
     * @method : GET
     */
    public function index()
    {
        return $this->respond([
            'statusCode' => 200,
            'message'    => 'OK',
            'data'       => $this->model->orderBy('id', 'DESC')->findAll()
        ], 200);
    }

    public function preview($paging = null)
    {
        $page=(int)$paging+1;

        // $page=$varpage ? $varpage : 1;
        // offset = (page - 1) * itemsPerPage + 1
        $offset = ($page - 1) * 4;

        $dataa=$this->model->where('status','publish')->countAllResults();
        $jumlah=$dataa/4;
        $total_page=ceil($jumlah);
        $data=$this->model->where('status','publish')->orderBy('id', 'DESC')->findAll(4, $offset);

        return $this->respond([
            'statusCode' => 200,
            'message'    => 'OK',
            'totalPage'    => $total_page,
            'totalRows'    => $dataa,
            'page'    => (int)$paging,
            'data'       => $data
        ], 200);
    }


    public function publish()
    {

  

        return $this->respond([
            'statusCode' => 200,
            'message'    => 'OK',
            'data'       => $this->model->where('status','publish')->orderBy('id', 'DESC')->findAll()
        ], 200);
    }

    public function draft()
    {

  

        return $this->respond([
            'statusCode' => 200,
            'message'    => 'OK',
            'data'       => $this->model->where('status','drafts')->orderBy('id', 'DESC')->findAll()
        ], 200);
    }

    public function trash()
    {

  

        return $this->respond([
            'statusCode' => 200,
            'message'    => 'OK',
            'data'       => $this->model->where('status','trash')->orderBy('id', 'DESC')->findAll()
        ], 200);
    }


    public function showpostid($id = null)
    {
        return $this->respond([
            'statusCode' => 200,
            'message'    => 'OK',
            'data'       => $this->model->find($id)
        ], 200);
    }

    /**
     * show function
     * @method : GET with params ID
     */
    public function show($id = null)
    {
        return $this->respond([
            'statusCode' => 200,
            'message'    => 'OK',
            'data'       => $this->model->find($id)
        ], 200);
    }

    /**
     * create function
     * @method : POST
     */
    public function create()
    {
        if ($this->request)
        {

            $validation = $this->validate([
                'title' => [
                    'rules'  => 'required|min_length[20]',
                    'errors' => [
                        'min_length' => 'Minimal 20 karakter.'
                    ]
                ],
                'content'    => [
                    'rules'  => 'required|min_length[200]',
                    'errors' => [
                        'min_length' => 'Minimal 200 karakter.'
                    ]
                ],
                'category'    => [
                    'rules'  => 'required|min_length[3]',
                    'errors' => [
                        'min_length' => 'Minimal 3 karakter.'
                    ]
                ],
            ]);
    
             if(!$validation) {
    
                return $this->respond([
                    'status' => 500,
                    'error' => true,
                    'message' => $this->validator->getErrors(),
                ], 500);
    
       
    
             }else{
       
            if($this->request->getJSON()) {

                $json = $this->request->getJSON();

                $post = $this->model->insert([
                    'title'     => $json->title,
                    'content'   => $json->content,
                    'category'   => $json->category,
                    'status'   => $json->status,
                ]);

            } else {

                //get request from Postman and more
                $post = $this->model->insert([
                    'title'     => $this->request->getPost('title'),
                    'content'   => $this->request->getPost('content'),
                    'category'   => $this->request->getPost('category'),
                    'status'   => $this->request->getPost('status'),
                ]);
            }
            
            return $this->respond([
                'statusCode' => 200,
                'message'    => 'Data Berhasil Disimpan!',
            ], 200);
        }
        }
    }

    /**
     * update function
     * @method : PUT or PATCH
     */
    public function updatepost($id = null)
    {
        //model
        $post = $this->model;

        if ($this->request)
        {
            $validation = $this->validate([
                'title' => [
                    'rules'  => 'required|min_length[20]',
                    'errors' => [
                        'min_length' => 'Minimal 20 karakter.'
                    ]
                ],
                'content'    => [
                    'rules'  => 'required|min_length[200]',
                    'errors' => [
                        'min_length' => 'Minimal 200 karakter.'
                    ]
                ],
                'category'    => [
                    'rules'  => 'required|min_length[3]',
                    'errors' => [
                        'min_length' => 'Minimal 3 karakter.'
                    ]
                ],
            ]);
    
             if(!$validation) {
    
                return $this->respond([
                    'status' => 200,
                    'error' => true,
                    'message' => $this->validator->getErrors(),
                ], 500);
    
       
    
             }else{
            
            if($this->request->getJSON()) {
            
                $json = $this->request->getJSON();
                
                $post->update($json->id, [
                    'title'     => $json->title,
                    'content'   => $json->content,
                    'category'   => $json->category,
                    'status'   => $json->status,
                ]);

            } else {

                //get request from Postman and more
                $data = $this->request->getRawInput();
                $post->update($id, $data);
            }

            return $this->respond([
                'statusCode' => 200,
                'message'    => 'Data Berhasil Diupdate!',
            ], 200);
            }
        }
    }


    public function createtrash($id = null)
    {
      

        $post = $this->model;

        if ($this->request)
        {
            
            if($this->request->getJSON()) {
            
                $json = $this->request->getJSON();
                
                $post->update($json->id, [
                    'status'   => $json->status,
                ]);

            } else {

                //get request from Postman and more
                $data = $this->request->getRawInput();
                $post->update($id, $data);
            }

            return $this->respond([
                'statusCode' => 200,
                'message'    => 'Data Berhasil Diupdate!',
            ], 200);
        }
    }


    /**
     * edit function
     * @method : DELETE with params ID
     */
    public function delete($id = null)
    {
        $post = $this->model->find($id);

        if($post) {

            $this->model->delete($id);

            return $this->respond([
                'statusCode' => 200,
                'message'    => 'Data Berhasil Dihapus!',
            ], 200);

        }
    }
}