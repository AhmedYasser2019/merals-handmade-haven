<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'email', 'subject', 'message', 'is_handled'])]
class ContactMessage extends Model
{
    protected function casts(): array
    {
        return ['is_handled' => 'boolean'];
    }
}
