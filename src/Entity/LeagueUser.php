<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\LeagueUserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=LeagueUserRepository::class)
 */
#[ApiResource]
class LeagueUser
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[Groups(['read:item:league'])]
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=User::class, inversedBy="leagueUser", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    #[Groups(['read:item:league'])]
    private $user;

    /**
     * @ORM\OneToOne(targetEntity=Summoner::class, mappedBy="leagueUser", cascade={"persist", "remove"})
     */
    private $summoner;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getSummoner(): ?Summoner
    {
        return $this->summoner;
    }

    public function setSummoner(Summoner $summoner): self
    {
        // set the owning side of the relation if necessary
        if ($summoner->getLeagueUser() !== $this) {
            $summoner->setLeagueUser($this);
        }

        $this->summoner = $summoner;

        return $this;
    }
}
