# API Calls - Transactions

## Récupérer les transactions d’un compte
GET /accounts/{accountId}/transactions

Description :
Récupère toutes les transactions du mois pour un compte donné.

---

## Récupérer le détail d’une transaction
GET /transactions/{transactionId}

Description :
Récupère les informations détaillées d’une transaction.

---

## Modifier une transaction
PATCH /transactions/{transactionId}

Description :
Permet de modifier la catégorie et les notes d’une transaction.

Body :
{
  "category": "Food",
  "notes": "Dinner"
}