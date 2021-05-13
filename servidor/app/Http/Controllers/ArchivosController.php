<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArchivoResource;
use Illuminate\Http\Request;
use App\Models\Archivo;


class ArchivosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = auth('api')->user();
        $files = Archivo::where('user_id', $user->id)->with('categoria')->get();
        return response(['archivos'=>ArchivoResource::collection($files),'message'=>'Retrived Successfuly'],200);
    }


     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showCategoria($idCategoria)
    {
        $user = auth('api')->user();
        $files = Archivo::where('user_id', $user->id)->with('categoria')->where('categoria', 1)->get();
        return response(['archivos'=>ArchivoResource::collection($files),'message'=>'Retrived Successfuly'],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|max:500000',
            'name' => 'required',
            'description' => 'required',
            'file_date' => 'required',
            'Categories' => 'required'

        ]);
        $fileName = $request->file('file')->getClientOriginalName();
        $user = auth('api')->user();
        $request->file('file')->store($user->user_folder . '/' . $fileName);
        $file = Archivo::create($request->all);
        Archivo::create([
            'name' => $request->name,
            'description' => $request->description,
            'file_date' => $request->file_date,
            'file_name' => $fileName,
        ]);
        return $file;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $archivo = Archivo::find($id);
        foreach ($archivo->categoria as $categoria) {
            echo $categoria->pivot->name;
        }
        return $archivo;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {

        $request->validate([
            'file' => 'required|max:500000',
            'id' => 'required',
            'name' => 'required',
            'description' => 'required',
            'file_date' => 'required',
            'Categories' => 'required'

        ]);

        $fileName = $request->file('file')->getClientOriginalName();
        $user = auth('api')->user();
        $request->file('file')->store($user->user_folder . '/' . $fileName);
        $data = Archivo::findOrFail($request->id);
        $data->name = $request->name;
        $data->description = $request->description;
        $data->file_date = $request->file_date;
        $data->file_name = $request->file_name;
        $data->save();
        return $data;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        Archivo::find($id)->delete();
    }
}
