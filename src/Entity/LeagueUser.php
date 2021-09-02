<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\MeController;
use App\Repository\LeagueUserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=LeagueUserRepository::class)
 */
#[ApiResource(
    collectionOperations: [
        'get' =>[
            'normalization_context' => [
                'groups' => ['read:LeagueUser:collection']
            ]
        ],
        'post' => [
            'denormalization_context' => [
                'groups' => ['post:LeagueUser:item']
            ],
            'openapi_context' => [
                'security' => [['bearerAuth' => []]]
            ],
        ]
    ],
    itemOperations: [
        'patch' => [
            "security" => "is_granted('ROLE_USER')",
            'openapi_context' => [
                'security' => [['bearerAuth' => []]]
            ],
            'denormalization_context' => [
                'groups' => ['patch:LeagueUser:item']
            ]
        ],
        'put' => [
            "security" => "is_granted('ROLE_USER')",
            'openapi_context' => [
                'security' => [['bearerAuth' => []]]
            ],
            'denormalization_context' => [
                'groups' => ['put:LeagueUser:item']
            ]
        ],
        'delete' => [
            "security" => "is_granted('ROLE_ADMIN')",
            'openapi_context' => [
                'security' => [['bearerAuth' => []]]
            ],
            'normalization_context' => [
                'groups' => ['delete:LeagueUser:admin']
            ]
        ],
        'get' => [
            "security" => "is_granted('ROLE_USER')",
            'openapi_context' => [
                'security' => [['bearerAuth' => []]]
            ],
            'normalization_context' => [
                'groups' => ['read:LeagueUser:item', 'read:LeagueUser:admin', 'read:Summoner:item']
            ]
        ]
    ]
)]
class LeagueUser
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[Groups([
        'read:LeagueUser:item',
        'delete:LeagueUser:admin'
    ])]
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=User::class, inversedBy="leagueUser", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    #[Groups([
        'read:LeagueUser:collection',
        'post:LeagueUser:item',
        'read:LeagueUser:item',
        'put:LeagueUser:item',
        'delete:LeagueUser:admin',
        'patch:LeagueUser:item'
    ])]
    private $user;

    /**
     * @ORM\OneToOne(targetEntity=Summoner::class, mappedBy="leagueUser", cascade={"persist", "remove"})
     */
    #[Groups([
        'read:LeagueUser:collection',
        'post:LeagueUser:item',
        'read:LeagueUser:item',
        'put:LeagueUser:item',
        'delete:LeagueUser:admin',
        'patch:LeagueUser:item'
    ])]
    private $summoner;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups([
        'read:LeagueUser:collection',
        'post:LeagueUser:item',
        'read:LeagueUser:item',
        'put:LeagueUser:item',
        'delete:LeagueUser:admin',
        'patch:LeagueUser:item'
    ])]
    private $role;

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

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(string $role): self
    {
        $this->role = $role;

        return $this;
    }
}
