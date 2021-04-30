<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Archivo;


class FilesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = auth()->user();
        $files = Archivo::where('user_id', $user->id)->with('categoria')->get();
        return $files;
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

        $user = auth()->user();
        //$request->file('file')->store($user->user_folder . '/');
        $file = File::create($request->all);
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
        $archivo=Archivo::find($id);
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
            'name' => 'required',
            'description' => 'required',
            'file_date' => 'required',
        ]);

        $data = File::findOrFail($request->id);
        $data->name = $request->name;
        $data->description = $request->description;
        $data->file_date = $request->file_date;
        $data->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        File::find($id)->delete();
    }
}
