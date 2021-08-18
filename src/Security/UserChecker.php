<?php

namespace App\Security;

use App\Entity\User as AppUser;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAccountStatusException;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserChecker implements UserCheckerInterface
{
    private SessionInterface $session;

    public function __construct(SessionInterface $session)
    {
        $this->session = $session;
    }

    public function checkPreAuth(UserInterface $user): void
    {
        if (!$user instanceof AppUser) {
            return;
        }

        if (!$this->session->get('verify')) {
            if (!$user->isVerified()) {
                // the message passed to this exception is meant to be displayed to the user
                throw new CustomUserMessageAccountStatusException('Votre compte n\'a pas d\'email validé');
            }
        }

        $this->session->remove('verify');
    }

    public function checkPostAuth(UserInterface $user): void
    {
        if (!$user instanceof AppUser) {
            return;
        }
    }
}

