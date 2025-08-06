# port-health-fillable-pdf — Fillable PDF Web Application (ColdFusion + Java)

## 📄 Overview
This project, originally developed in 2016, is a secure web application for **dynamic fillable PDF generation** using **ColdFusion**, **Java**, and **Spring Security**. It was built for case management and personal-centered planning (PCP) workflows and generates structured documents using PDF forms (`fillable_pcpCCP2.pdf`) populated from database-driven web forms.

---

## 🧰 Tech Stack

| Layer            | Technologies / Tools            |
|------------------|----------------------------------|
| UI Layer         | ColdFusion (Adobe CFML 2016)     |
| Backend          | Java Servlets + Spring Security  |
| PDF Integration  | iText 1.3.1, PDF Form Templates  |
| Authentication   | Spring Security (CAS, LDAP, ACL) |
| Build Tool       | Maven                            |
| Server           | Apache Tomcat                    |
| Packaging        | WAR                              |
| Dependencies     | `javax.servlet-api`, `jstl`, `commons-logging` |

---

## 📁 Key Files

```
port/
├── src/
│   └── main/
│       └── java/
│           └── port/
│               ├── SecurityConfig.java                # Spring security configuration
│               └── SecurityWebApplicationInitializer  # Servlet initializer
├── web/
│   ├── readTest.cfm             # ColdFusion logic for reading data
│   ├── test.cfm                 # ColdFusion interface for user input
│   ├── fillable_pcpCCP2.pdf     # PDF form template used for generation
│   └── web.xml                  # Servlet and filter configuration
├── pom.xml                      # Project dependencies and configuration
└── ...
```

---

## 📄 Features

- 📝 Fill out structured PDF documents with individual and health plan data
- 🔐 Secure form access using Spring Security filters (`SecurityConfig`)
- 📑 ColdFusion-generated PDFs using server-side field population
- 📦 WAR-packaged for deployment in any servlet container (e.g., Tomcat)

---

## 🧪 Dependencies from `pom.xml`

Key libraries:
- `javax.servlet-api` (3.0.1)
- `junit` (3.8.1)
- `spring-security-*` (v4.0.4)
- `commons-logging`
- `jstl`
- `org.apache.derby` (embedded DB)
- `itext` (1.3.1) — PDF generation
- `com.adobe.coldfusion:coldfusion:2016` (runtime WAR dependency)

---

## 🔧 Setup & Deployment

### 📌 Prerequisites
- Java 8+
- ColdFusion 2016+ Server (Adobe or Lucee)
- Apache Tomcat or another Java EE container
- Maven 3+

### 🛠 Build Instructions

```bash
mvn clean install
```

This will output a `port.war` file in the `target/` directory.

### 🚀 Deploy

1. Deploy the WAR to your servlet container (Tomcat recommended)
2. Ensure ColdFusion is mapped to the correct web root
3. Access:
   - `/test.cfm` — form interface
   - `/readTest.cfm` — data handler (optional)
   - `/fillable_pcpCCP2.pdf` — PDF populated dynamically via form

---

## 🔐 Security

The app uses Spring Security’s filter chain to control access to servlet routes (`/SecurityConfig`) and form endpoints. The `SecurityConfig.java` and `SecurityWebApplicationInitializer.java` files handle initialization and custom rule definitions.

---

## 📌 Use Case

Originally designed for **North Carolina Department of Mental Health (DMH/DD/SAS)** service providers, the system supports:
- Personal-centered planning (PCP)
- Crisis prevention documentation
- Medicaid and case-specific forms
- Digital record submission and tracking

---

## 🧠 What I Learned

> This project helped me understand how to bridge ColdFusion and Java securely within the same WAR-packaged system. It gave me insight into working with PDF form templates programmatically, while also exploring security configuration using Java-based Spring filters.

---

## 🛠️ Modernization Ideas

- Replace ColdFusion views with React/Angular frontend
- Convert ColdFusion logic to Java (or Spring Boot controller)
- Use modern PDF solutions (PDFBox, OpenPDF)
- Secure with Spring Boot and OAuth2 instead of legacy security filters

---

## 📜 License

This project was created for internal use and educational purposes. Please update, adapt, or reuse with attribution.


