<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Planning extends Model
{
    use HasFactory;

    protected $fillable = [
        'date', 'heureDebut', 'heureFin', 'employe_id'
    ];

    public function employe()
    {
        return $this->belongsTo(Employe::class);
    }
}
