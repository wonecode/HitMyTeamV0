<?php

namespace App\Repository;

use App\Entity\LeagueUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method LeagueUser|null find($id, $lockMode = null, $lockVersion = null)
 * @method LeagueUser|null findOneBy(array $criteria, array $orderBy = null)
 * @method LeagueUser[]    findAll()
 * @method LeagueUser[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LeagueUserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LeagueUser::class);
    }

    // /**
    //  * @return LeagueUser[] Returns an array of LeagueUser objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?LeagueUser
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
