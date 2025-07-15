function InstantiateSideBar() {
    const sidebar = document.createElement("nav");
    sidebar.className = "sidebar";

    // Lista de opções: [texto, href]
    const opcoes = [
        ["Horários", "index.html"],
        ["Horário semanal", "semana.html"],
        ["Eventos", "eventos.html"],
        ["Mudança de horário", "mudanca.html"],
        ["Reuniões", "reunioes.html"],
        ["Conselhos de classe", "conselho.html"],
        ["Grade", "grade.html"]
    ];

    opcoes.forEach(([texto, href]) => {
        const a = document.createElement("a");
        a.textContent = texto;
        a.href = href;
        a.className = "sidebar-link";
        sidebar.appendChild(a);
    });

    // Adiciona a sidebar ao body ou a outro container desejado
    document.body.prepend(sidebar);
}

InstantiateSideBar();