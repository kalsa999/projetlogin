<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompteFidelite extends Model
{
    use HasFactory;

    protected $fillable = ['points', 'client_id'];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
