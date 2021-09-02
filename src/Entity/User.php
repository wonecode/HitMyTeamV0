<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\MeController;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Lexik\Bundle\JWTAuthenticationBundle\Security\User\JWTUserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\Regex;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @UniqueEntity(fields={"email"}, message="There is already an account with this email")
 */
#[ApiResource(
    collectionOperations: [
        'get' =>[
            "security" => "is_granted('ROLE_USER')",
            'normalization_context' => [
                'groups' => ['read:user:collection', 'read:user:item', 'read:league:item']
            ],
            'openapi_context' => [
                'security' => [['bearerAuth' => []]]
            ],
        ],
        'post' => [
            'denormalization_context' => [
                'groups' => ['post:user:item']
            ]
        ]
    ],
    itemOperations: [
        'put' => [
            "security" => "is_granted('ROLE_USER')",
            'openapi_context' => [
                'security' => [['bearerAuth' => []]]
            ],
            'denormalization_context' => [
                'groups' => ['put:user:item']
            ]
        ],
        'delete' => [
            "security" => "is_granted('ROLE_ADMIN')",
            'openapi_context' => [
                'security' => [['bearerAuth' => []]]
            ],
        ],
        'get' => [
            "security" => "is_granted('ROLE_USER')",
            'openapi_context' => [
                'security' => [['bearerAuth' => []]]
            ],
            'normalization_context' => [
                'groups' => ['read:user:collection', 'read:user:item', 'read:LeagueUser:item']
            ]
        ],
        'me' => [
            "security" => "is_granted('ROLE_USER')",
            'pagination_enabled' => false,
            'path' => '/me',
            'method' => 'get',
            'controller' => MeController::class,
            'read' => false,
            'openapi_context' => [
                'security' => [['bearerAuth' => []]],
            ],
            'normalization_context' => [
                'groups' => ['read:user:me']
            ]
        ],
    ]
)]
#[UniqueEntity('email')]
#[UniqueEntity('username')]
class User implements UserInterface, PasswordAuthenticatedUserInterface, JWTUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    #[Groups([
            'read:user:me',
            'read:user:item',
            'read:LeagueUser:collection',
            'read:LeagueUser:item',]
    )]
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     */
    #[Groups([
            'read:user:collection',
            'put:user:item',
            'post:user:item',
            'read:user:me',
            'read:LeagueUser:collection',
            'read:LeagueUser:item',
        ]
    )]
    #[Email]
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    #[Groups([
            'read:user:item',
            'read:user:me'
        ]
    )]
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    #[Groups(['post:user:item'])]
    #[
        Length(min: 12),
        Regex(pattern: '/(?=.*[!@#$%^&*-])(?=.*\d)(?=.*[A-Z])(?=.*[a-z])/', message: "Le mot de passe doit contenir au minimum un chiffre, une majuscule, une minuscule et un caractère spécial.")
    ]
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Groups([
            'read:user:collection',
            'read:user:item',
            'put:user:item',
            'post:user:item',
            'read:user:me',
            'read:LeagueUser:collection',
            'read:LeagueUser:item',
        ]
    )]
    private $username;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    #[Groups(['read:user:item', 'post:user:item'])]
    private $createdAt;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     */
    #[Groups(['put:user:item'])]
    private $updatedAt;

    /**
     * @ORM\Column(type="boolean")
     */
    #[Groups(['read:user:item','put:user:item', 'read:user:me'])]
    private $isVerified = false;

    /**
     * @ORM\OneToOne(targetEntity=LeagueUser::class, mappedBy="user", cascade={"persist", "remove"})
     */
    #[Groups(['read:user:item', 'put:user:item'])]
    private $leagueUser;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId($id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function isVerified(): bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(bool $isVerified): self
    {
        $this->isVerified = $isVerified;

        return $this;
    }

    public function getLeagueUser(): ?LeagueUser
    {
        return $this->leagueUser;
    }

    public function setLeagueUser(LeagueUser $leagueUser): self
    {
        // set the owning side of the relation if necessary
        if ($leagueUser->getUser() !== $this) {
            $leagueUser->setUser($this);
        }

        $this->leagueUser = $leagueUser;

        return $this;
    }

    public static function createFromPayload($userIdentifier, array $payload)
    {
        $user = new User();
        $user->setId($payload['id']);
        $user->setEmail($userIdentifier);
        $user->setRoles($payload['roles']);
        return $user;
    }
}
