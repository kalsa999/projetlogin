<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ChangePasswordTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_user_can_change_password_with_the_current_password(): void
    {
        $user = User::factory()->create([
            'email' => 'khalid@example.com',
            'password' => 'password123',
        ]);

        $response = $this->postJson('/api/change-password', [
            'email' => $user->email,
            'current_password' => 'password123',
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);

        $response->assertOk();

        $user->refresh();

        $this->assertTrue(Hash::check('newpassword123', $user->password));
    }

    public function test_password_change_fails_with_an_invalid_current_password(): void
    {
        $user = User::factory()->create([
            'email' => 'khalid@example.com',
            'password' => 'password123',
        ]);

        $response = $this->postJson('/api/change-password', [
            'email' => $user->email,
            'current_password' => 'wrongpassword',
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);

        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['current_password']);
    }
}
