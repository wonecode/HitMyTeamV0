<?php

namespace App\DataPersister;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use phpDocumentor\Reflection\DocBlock\Tags\Var_;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserDataPersister implements \ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface
{

    public function __construct(
        private EntityManagerInterface $em,
        private UserPasswordHasherInterface $passwordHasher
    ){}

    /**
     * @inheritDoc
     */
    public function supports($data, array $context = []): bool
    {
        return $data instanceof User;
    }

    /**
     * @inheritDoc
     */
    public function persist($data, array $context = [])
    {
        /** @var User $user */
        $user = $data;
        if($user->getPassword()){
            $user->setPassword($this->passwordHasher->hashPassword($user, $user->getPassword()));
        }
        $this->em->persist($user);
        $this->em->flush();
    }

    /**
     * @inheritDoc
     */
    public function remove($data, array $context = [])
    {
        $this->em->remove($data);
        $this->em->flush();
    }
}
