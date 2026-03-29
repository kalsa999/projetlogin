<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employe extends Model
{
    use HasFactory;

    protected $fillable = ['poste', 'dateEmbauche', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function salaires()
    {
        return $this->hasMany(Salaire::class);
    }

    public function plannings()
    {
        return $this->hasMany(Planning::class);
    }
}
