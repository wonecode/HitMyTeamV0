<?php

namespace App\DataFixtures;

use App\Entity\User;
use DateTimeImmutable;
use DateTimeZone;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private UserPasswordHasherInterface  $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    /**
     * @throws \Exception
     */
    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setEmail('user@hitmyteam.gg');
        $user->setPassword($this->passwordHasher->hashPassword(
            $user,
            'user'
        ));
        $user->setUsername('user');
        $user->setCreatedAt(new DateTimeImmutable('', new DateTimeZone('Europe/Paris')));
        $manager->persist($user);

        $user = new User();
        $user->setEmail('admin@hitmyteam.gg');
        $user->setPassword($this->passwordHasher->hashPassword(
            $user,
            'user'
        ));
        $user->setUsername('admin');
        $user->setCreatedAt(new DateTimeImmutable('', new DateTimeZone('Europe/Paris')));
        $user->setRoles(['ROLE_ADMIN']);
        $manager->persist($user);

        $manager->flush();
    }
}
