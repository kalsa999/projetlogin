<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_user_can_register(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Khalid',
            'email' => 'khalid@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('user.email', 'khalid@example.com');

        $this->assertDatabaseHas('users', [
            'email' => 'khalid@example.com',
        ]);

        $this->assertDatabaseCount('clients', 1);
    }
}
