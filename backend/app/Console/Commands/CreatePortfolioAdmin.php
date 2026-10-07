<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Validator;

class CreatePortfolioAdmin extends Command
{
    protected $signature = 'portfolio:admin {email} {--password-file= : Read a password from a private file instead of a prompt}';

    protected $description = 'Create a portfolio administrator; never overwrite an existing account';

    public function handle(): int
    {
        $email = $this->argument('email');
        if (User::where('email', $email)->exists()) {
            $this->error('This account already exists. No changes made.');

            return self::FAILURE;
        }
        $file = $this->option('password-file');
        $password = $file ? trim(file_get_contents($file)) : $this->secret('Password (at least 16 characters)');
        $validator = Validator::make(compact('email', 'password'), ['email' => 'required|email|max:254', 'password' => 'required|string|min:16|max:128']);
        if ($validator->fails()) {
            $this->error($validator->errors()->first());

            return self::FAILURE;
        }
        $user = new User(['email' => $email, 'name' => 'Portfolio administrator', 'password' => $password]);
        $user->is_admin = true;
        $user->save();
        $this->info('Administrator created.');

        return self::SUCCESS;
    }
}
