<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SummonerRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=SummonerRepository::class)
 */
#[ApiResource(
    collectionOperations: [
        'get' =>[
            'normalization_context' => [
                'groups' => ['read:Summoner:collection']
            ]
        ],
        'post' => [
            'denormalization_context' => [
                'groups' => ['post:Summoner:item']
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
                'groups' => ['patch:Summoner:item']
            ]
        ],
        'put' => [
            "security" => "is_granted('ROLE_USER')",
            'openapi_context' => [
                'security' => [['bearerAuth' => []]]
            ],
            'denormalization_context' => [
                'groups' => ['put:Summoner:item']
            ]
        ],
        'delete' => [
            "security" => "is_granted('ROLE_ADMIN')",
            'openapi_context' => [
                'security' => [['bearerAuth' => []]]
            ],
            'normalization_context' => [
                'groups' => ['delete:Summoner:admin']
            ]
        ],
        'get' => [
            "security" => "is_granted('ROLE_USER')",
            'openapi_context' => [
                'security' => [['bearerAuth' => []]]
            ],
            'normalization_context' => [
                'groups' => ['read:Summoner:item', 'read:Summoner:admin']
            ]
        ]
    ]
)]
class Summoner
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[Groups([
        'delete:Summoner:admin',
        'read:Summoner:admin,',
        'read:Summoner:item'
    ])]
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups([
        'read:Summoner:collection',
        'read:Summoner:item',
        'post:Summoner:item',
        'patch:Summoner:item',
        'put:Summoner:item',
        'delete:Summoner:admin'
    ])]
    private $name;

    /**
     * @ORM\Column(type="string")
     */
    #[Groups([
        'read:Summoner:collection',
        'read:Summoner:item',
        'post:Summoner:item',
        'patch:Summoner:item',
        'put:Summoner:item',
        'delete:Summoner:admin'
    ])]
    private $icon;

    /**
     * @ORM\Column(type="boolean")
     */
    #[Groups([
        'read:Summoner:collection',
        'read:Summoner:item',
        'post:Summoner:item',
        'patch:Summoner:item',
        'put:Summoner:item',
        'delete:Summoner:admin'
    ])]
    private $isAvailable = false;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups([
        'read:Summoner:collection',
        'read:Summoner:item',
        'post:Summoner:item',
        'patch:Summoner:item',
        'put:Summoner:item',
        'delete:Summoner:admin'
    ])]
    private $tier;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    #[Groups([
        'read:Summoner:collection',
        'read:Summoner:item',
        'post:Summoner:item',
        'patch:Summoner:item',
        'put:Summoner:item',
        'delete:Summoner:admin'
    ])]
    private $ranking;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    #[Groups([
        'read:Summoner:collection',
        'read:Summoner:item',
        'post:Summoner:item',
        'patch:Summoner:item',
        'put:Summoner:item',
        'delete:Summoner:admin'
    ])]
    private $leaguepoints;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    #[Groups([
        'read:Summoner:collection',
        'read:Summoner:item',
        'post:Summoner:item',
        'patch:Summoner:item',
        'put:Summoner:item',
        'delete:Summoner:admin'
    ])]
    private $wins;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    #[Groups([
        'read:Summoner:collection',
        'read:Summoner:item',
        'post:Summoner:item',
        'patch:Summoner:item',
        'put:Summoner:item',
        'delete:Summoner:admin'
    ])]
    private $losses;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    #[Groups([
        'read:Summoner:collection',
        'read:Summoner:item',
        'post:Summoner:item',
        'patch:Summoner:item',
        'put:Summoner:item',
        'delete:Summoner:admin'
    ])]
    private $isHotstreak;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups([
        'read:Summoner:collection',
        'read:Summoner:item',
        'post:Summoner:item',
        'patch:Summoner:item',
        'put:Summoner:item',
        'delete:Summoner:admin'
    ])]
    private $mainRole;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups([
        'read:Summoner:collection',
        'read:Summoner:item',
        'post:Summoner:item',
        'patch:Summoner:item',
        'put:Summoner:item',
        'delete:Summoner:admin'
    ])]
    private $mainChampion;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups([
        'read:Summoner:collection',
        'read:Summoner:item',
        'post:Summoner:item',
        'patch:Summoner:item',
        'put:Summoner:item',
        'delete:Summoner:admin'
    ])]
    private $secondChampion;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    #[Groups([
        'read:Summoner:collection',
        'read:Summoner:item',
        'post:Summoner:item',
        'patch:Summoner:item',
        'put:Summoner:item',
        'delete:Summoner:admin'
    ])]
    private $thirdChampion;

    /**
     * @ORM\OneToOne(targetEntity=LeagueUser::class, inversedBy="summoner")
     * @ORM\JoinColumn(nullable=false)
     */
    #[Groups(['post:Summoner:item', 'read:Summoner:item'])]
    private $leagueUser;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function setIcon(string $icon): self
    {
        $this->icon = $icon;

        return $this;
    }

    public function getIsAvailable(): ?bool
    {
        return $this->isAvailable;
    }

    public function setIsAvailable(bool $isAvailable): self
    {
        $this->isAvailable = $isAvailable;

        return $this;
    }

    public function getTier(): ?string
    {
        return $this->tier;
    }

    public function setTier(string $tier): self
    {
        $this->tier = $tier;

        return $this;
    }

    public function getRanking(): ?int
    {
        return $this->ranking;
    }

    public function setRanking(?int $ranking): self
    {
        $this->ranking = $ranking;

        return $this;
    }

    public function getLeaguepoints(): ?int
    {
        return $this->leaguepoints;
    }

    public function setLeaguepoints(?int $leaguepoints): self
    {
        $this->leaguepoints = $leaguepoints;

        return $this;
    }

    public function getWins(): ?int
    {
        return $this->wins;
    }

    public function setWins(?int $wins): self
    {
        $this->wins = $wins;

        return $this;
    }

    public function getLosses(): ?int
    {
        return $this->losses;
    }

    public function setLosses(?int $losses): self
    {
        $this->losses = $losses;

        return $this;
    }

    public function getIsHotstreak(): ?bool
    {
        return $this->isHotstreak;
    }

    public function setIsHotstreak(?bool $isHotstreak): self
    {
        $this->isHotstreak = $isHotstreak;

        return $this;
    }

    public function getMainRole(): ?string
    {
        return $this->mainRole;
    }

    public function setMainRole(?string $mainRole): self
    {
        $this->mainRole = $mainRole;

        return $this;
    }

    public function getMainChampion(): ?string
    {
        return $this->mainChampion;
    }

    public function setMainChampion(?string $mainChampion): self
    {
        $this->mainChampion = $mainChampion;

        return $this;
    }

    public function getSecondChampion(): ?string
    {
        return $this->secondChampion;
    }

    public function setSecondChampion(?string $secondChampion): self
    {
        $this->secondChampion = $secondChampion;

        return $this;
    }

    public function getThirdChampion(): ?string
    {
        return $this->thirdChampion;
    }

    public function setThirdChampion(?string $thirdChampion): self
    {
        $this->thirdChampion = $thirdChampion;

        return $this;
    }

    public function getLeagueUser(): ?LeagueUser
    {
        return $this->leagueUser;
    }

    public function setLeagueUser(LeagueUser $leagueUser): self
    {
        $this->leagueUser = $leagueUser;

        return $this;
    }
}
