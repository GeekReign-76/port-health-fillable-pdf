/* Language definition file for feedback component  */
/* version: 20120731*/

var lHelpful=document.getElementById('helpfulspan');
var lYes=document.getElementById('yesspan');
var lNo=document.getElementById('nospan');
var lFeedback=document.getElementById('feedbacktext');
var lButton=document.getElementById('submitButton');
var lnoComment=document.getElementById('noCommentButton');
var lTermsOfUse=document.getElementById('termsofuse');
var lThanks;

switch(true)
{
	case document.URL.indexOf('en_US') > 0 || document.URL.indexOf('/en/') > 0 || document.URL.indexOf('=en') > 0:
		lHelpful.innerHTML="Was this helpful?";
		lYes.innerHTML="Yes";
		lNo.innerHTML="No";
		lFeedback.placeholder="(Optional) Please let us know how we can improve this page.";
		lButton.innerHTML="Submit";
		lThanks="Thanks for your feedback.";
		lnoComment.innerHTML="No Comment";
		lTermsOfUse="By clicking Submit, you accept the <a target=\"_blank\" href=\"http://www.adobe.com/misc/terms.html\">Adobe Terms of Use</a>.";
		break;
	case document.URL.indexOf('ja_JP') > 0 || document.URL.indexOf('/jp/') > 0 || document.URL.indexOf('=jp') > 0:
		lHelpful.innerHTML="役に立ちましたか？";
		lYes.innerHTML="はい";
		lNo.innerHTML="いいえ";
		lFeedback.placeholder="このページの品質を向上させるためにフィードバックをお願いします。";
		lButton.innerHTML="送信";
		lThanks="ご意見をお寄せいただきありがとうございます。";
		lnoComment.innerHTML="回答しない";
		lTermsOfUse.innerHTML="「送信」をクリックすると、<a href=\"http://www.adobe.com/jp/misc/terms.html\" target=\"_blank\">利用規約</a>&nbsp;に同意したものとみなされます。";
		break;
	case document.URL.indexOf('fr_FR') > 0 || document.URL.indexOf('/fr/') > 0 || document.URL.indexOf('=fr') > 0:
		lHelpful.innerHTML="Était-ce utile?";
		lYes.innerHTML="Oui";
		lNo.innerHTML="Non";
		lFeedback.placeholder="S'il vous plaît laissez-nous savoir comment nous pouvons améliorer cette page.";
		lButton.innerHTML="Soumettre";
		lThanks="Merci pour vos commentaires.";
		lnoComment.innerHTML="Pas de commentaires";
		lTermsOfUse.innerHTML="En cliquant sur Envoyer, vous signifiez que vous acceptez les <a target=\"_blank\" href=\"http://www.adobe.com/fr/misc/terms.html\">Conditions d'utilisation d'Adobe</a>";
		break;
	case document.URL.indexOf('de_DE') > 0 || document.URL.indexOf('/de/') > 0 || document.URL.indexOf('=de') > 0:
		lHelpful.innerHTML="War dies hilfreich?";
		lYes.innerHTML="Ja";
		lNo.innerHTML="Nein";
		lFeedback.placeholder="Bitte lassen Sie uns wissen, wie wir diese Seite verbessern.";
		lButton.innerHTML="Einreichen";
		lThanks="Vielen Dank für Ihr Feedback.";
		lnoComment.innerHTML="Kein Kommentar";
		lTermsOfUse.innerHTML="Wenn Sie auf \u201eAbschicken\u201c klicken, stimmen Sie den <a target=\"_blank\" href=\"http://www.adobe.com/de/misc/terms.html\">Nutzungsbedingungen von Adobe</a> zu";
		break;
	case document.URL.indexOf('it_IT') > 0 || document.URL.indexOf('/it/') > 0 || document.URL.indexOf('=it') > 0:
		lHelpful.innerHTML="È stato utile?";
		lYes.innerHTML="Si";
		lNo.innerHTML="No";
		lFeedback.placeholder="Fateci sapere come possiamo migliorare questa pagina.";
		lButton.innerHTML="Presentare";
		lThanks="Grazie per il tuo feedback.";
		lnoComment.innerHTML="Nessun commento";
		lTermsOfUse.innerHTML="Facendo clic su Invia, si accettano i <a target=\"_blank\" href=\"http://www.adobe.com/it/misc/terms.html\">Termini d\u2019uso di Adobe</a>.";
		break;
	case document.URL.indexOf('sv_SE') > 0 || document.URL.indexOf('/se/') > 0 || document.URL.indexOf('=sv') > 0:
		lHelpful.innerHTML="Var det här till hjälp?";
		lYes.innerHTML="Ja";
		lNo.innerHTML="Nej";
		lFeedback.placeholder="Låt oss veta hur vi kan förbättra den här sidan.";
		lButton.innerHTML="Lämna";
		lThanks="Tack för din feedback.";
		lnoComment.innerHTML="Inga kommentarer";
		lTermsOfUse.innerHTML="Genom att klicka p\u00e5 Skicka godk\u00e4nner du <a target=\"_blank\" href=\"http://www.adobe.com/se/misc/terms.html\">Adobes anv\u00e4ndarvillkor</a>.";
		break;
	case document.URL.indexOf('es_ES') > 0 || document.URL.indexOf('/es/') > 0 || document.URL.indexOf('=es') > 0:
		lHelpful.innerHTML="¿Le ha resultado útil esta información?";
		lYes.innerHTML="Sí";
		lNo.innerHTML="No";
		lFeedback.placeholder="Por favor, háganos saber cómo podemos mejorar esta página.";
		lButton.innerHTML="Enviar";
		lThanks="Gracias por tus comentarios.";
		lnoComment.innerHTML="No dejar comentario";
		lTermsOfUse.innerHTML="Haga clic en Enviar si acepta las <a target=\"_blank\" href=\"http://www.adobe.com/es/misc/terms.html\">condiciones de uso de Adobe</a>.";
		break;
	case document.URL.indexOf('nl_NL') > 0 || document.URL.indexOf('/nl/') > 0 || document.URL.indexOf('=nl') > 0:
		lHelpful.innerHTML="Was deze informatie nuttig?";
		lYes.innerHTML="Ja";
		lNo.innerHTML="Nee";
		lFeedback.placeholder="Laat het ons weten hoe we deze pagina verbeteren.";
		lButton.innerHTML="Voorleggen";
		lThanks="Bedankt voor uw feedback.";
		lnoComment.innerHTML="Geen commentaar";
		lTermsOfUse.innerHTML="Door op Verzenden te klikken, gaat u akkoord met de <a target=\"_blank\" href=\"http://www.adobe.com/nl/misc/terms.html\">Adobe-gebruiksvoorwaarden</a>.";
		break;
	case document.URL.indexOf('da_DK') > 0 || document.URL.indexOf('/dk/') > 0 || document.URL.indexOf('=da') > 0:
		lHelpful.innerHTML="Hjalp dette dig videre?";
		lYes.innerHTML="Ja";
		lNo.innerHTML="Nej";
		lFeedback.placeholder="Lad os vide, hvordan vi kan forbedre denne side.";
		lButton.innerHTML="Indsend";
		lThanks="Tak for din feedback.";
		lnoComment.innerHTML="Ingen kommentarer";
		lTermsOfUse.innerHTML="Hvis du klikker p\u00e5 send, accepterer du samtidig <a target=\"_blank\" href=\"http://www.adobe.com/dk/misc/terms.html\">Adobes betingelser</a>.";
		break;
	case document.URL.indexOf('pt_BR') > 0 || document.URL.indexOf('/br/') > 0 || document.URL.indexOf('=br') > 0:
		lHelpful.innerHTML="Isso foi útil?";
		lYes.innerHTML="Sim";
		lNo.innerHTML="Não";
		lFeedback.placeholder="Por favor, deixe-nos saber como podemos melhorar esta página.";
		lButton.innerHTML="Submeter";
		lThanks="Obrigado por seus comentários.";
		lnoComment.innerHTML="Sem comentários";
		lTermsOfUse.innerHTML="Ao clicar em enviar, voc\u00ea estar\u00e1 aceitando os <a target=\"_blank\" href=\"http://www.adobe.com/br/misc/terms.html\">Termos de Uso da Adobe</a>.";
		break;
	case document.URL.indexOf('nb_NO') > 0 || document.URL.indexOf('/no/') > 0 || document.URL.indexOf('=nb') > 0:
		lHelpful.innerHTML="Var dette nyttig?";
		lYes.innerHTML="Ja";
		lNo.innerHTML="Nei";
		lFeedback.placeholder="Vennligst la oss hvordan vi kan forbedre denne siden.";
		lButton.innerHTML="Send";
		lThanks="Takk for tilbakemeldingen.";
		lnoComment.innerHTML="Ingen kommentar";
		lTermsOfUse.innerHTML="Ved å klikke på Send godtar du <a target=\"_blank\" href=\"http://www.adobe.com/no/misc/terms.html\">Adobes bruksvilkår</a>.";
		break;
	case document.URL.indexOf('fi_FI') > 0 || document.URL.indexOf('/fi/') > 0 || document.URL.indexOf('=fi') > 0:
		lHelpful.innerHTML="Oliko tästä hyötyä?";
		lYes.innerHTML="Kyllä";
		lNo.innerHTML="Ei";
		lFeedback.placeholder="Kerro meille miten voisimme parantaa tällä sivulla.";
		lButton.innerHTML="Antaa";
		lThanks="Kiitos palautteesta.";
		lnoComment.innerHTML="Ei kommenttia";
		lTermsOfUse.innerHTML="Napsauttamalla Lähetä hyväksyt <a target=\"_blank\" href=\"http://www.adobe.com/fi/misc/terms.html\">Adoben käyttöehdot</a>.";
		break;
	default:
		lHelpful.innerHTML="Was this helpful?";
		lYes.innerHTML="Yes";
		lNo.innerHTML="No";
		lFeedback.placeholder="(Optional) Please let us know how we can improve this page.";
		lButton.innerHTML="Submit";
		lThanks="Thanks for your feedback.";
		lnoComment.innerHTML="No Comment";
		lTermsOfUse.innerHTML="By clicking Submit, you accept the <a target=\"_blank\" href=\"http://www.adobe.com/misc/terms.html\">Adobe Terms of Use</a>.";
}
