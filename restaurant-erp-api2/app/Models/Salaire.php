<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salaire extends Model
{
    use HasFactory;

    protected $fillable = [
        'salaireBase', 'prime', 'deduction',
        'salaireNet', 'employe_id'
    ];

    public function employe()
    {
        return $this->belongsTo(Employe::class);
    }
}
