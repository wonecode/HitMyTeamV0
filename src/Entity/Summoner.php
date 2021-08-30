<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SummonerRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=SummonerRepository::class)
 */
#[ApiResource(
    openapiContext: [
        'security' => [['bearerAuth' => []]]
    ],
    security: 'is_granted("ROLE_USER")'
)]
class Summoner
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=LeagueUser::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $leagueUser;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="integer")
     */
    private $icon;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isAvailable;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $tier;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $rank;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $leaguepoints;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $wins;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $losses;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $isHotstreak;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $mainRole;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $mainChampion;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $secondChampion;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $thirdChampion;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getIcon(): ?int
    {
        return $this->icon;
    }

    public function setIcon(int $icon): self
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

    public function getRank(): ?int
    {
        return $this->rank;
    }

    public function setRank(?int $rank): self
    {
        $this->rank = $rank;

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
}
