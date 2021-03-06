<?php

namespace App\OpenApi;

use ApiPlatform\Core\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\Core\OpenApi\Model\Operation;
use ApiPlatform\Core\OpenApi\Model\PathItem;
use ApiPlatform\Core\OpenApi\Model\RequestBody;
use ApiPlatform\Core\OpenApi\OpenApi;
use ArrayObject;

class OpenApiFactory implements OpenApiFactoryInterface
{
    public function __construct(private OpenApiFactoryInterface $decorated)
    {
    }

    public function __invoke(array $context = []): OpenApi
    {
        $openApi = $this->decorated->__invoke($context);

        /** @var PathItem $path */
        foreach ($openApi->getPaths()->getPaths() as $key => $path) {
            if ($path->getGet() && $path->getGet()->getSummary() === 'hidden') {
                $openApi->getPaths()->addPath($key, $path->withGet(null));
            }
        }

        $schemas = $openApi->getComponents()->getSecuritySchemes();
        $schemas['bearerAuth'] = new ArrayObject([
            'type' => 'http',
            'scheme' => 'bearer',
            'bearerFormat' => 'JWT'
        ]);

        $schemas = $openApi->getComponents()->getSchemas();

        $schemas['Token'] = new ArrayObject([
            'type' => 'object',
            'properties' => [
                'token' => [
                    'type' => 'string',
                    'readOnly' => true,
                ],
                'refresh_token' => [
                    'type' => 'string',
                    'readOnly' => true,
                ]
            ]
        ]);

        $schemas['Credentials'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'username' => [
                    'type' => 'string',
                    'example' => 'user@hitmyteam.gg',
                ],
                'password' => [
                    'type' => 'string',
                    'example' => 'user',
                ],
            ],
        ]);

        $pathItem = new PathItem(
            ref: 'JWT Token',
            post: new Operation(
                operationId: 'postCredentialsItem',
                tags: ['Token'],
                responses: [
                    '200' => [
                        'description' => 'Get JWT token and refresh Token with Credentials',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/Token',
                                ],
                            ],
                        ],
                    ],
                ],
                summary: 'Get JWT token to login.',
                requestBody: new RequestBody(
                    description: 'Generate new JWT Token',
                    content: new \ArrayObject([
                        'application/json' => [
                            'schema' => [
                                '$ref' => '#/components/schemas/Credentials',
                            ],
                        ],
                    ]),
                ),
            ),
        );

        $openApi->getPaths()->addPath('/security/api/v1/login', $pathItem);


        $schemas['RefreshToken'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'refresh_token' => [
                    'type' => 'string',
                    'example' => 'your token refresh',
                ],
            ],
        ]);

        $pathItem = new PathItem(
            ref: 'JWT Refresh Token',
            post: new Operation(
                operationId: 'refreshPostCredentialsItem',
                tags: ['Token'],
                responses: [
                    '200' => [
                        'description' => 'Get JWT token and refresh Token without Credential just last refresh token',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/Token',
                                ],
                            ],
                        ],
                    ],
                ],
                summary: 'Get JWT refresh token & new token.',
                requestBody: new RequestBody(
                    description: 'refresh new JWT Token & refresh_token',
                    content: new \ArrayObject([
                        'application/json' => [
                            'schema' => [
                                '$ref' => '#/components/schemas/RefreshToken',
                            ],
                        ],
                    ]),
                ),
            ),
        );

        $openApi->getPaths()->addPath('/security/api/v1/token/refresh', $pathItem);

        return $openApi;
    }
}
