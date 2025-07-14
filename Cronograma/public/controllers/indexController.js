function organizarCalendario() {
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaHoje = hoje.getDate();
    const monthBox = document.getElementById("month-box");
    monthBox.innerHTML = ""; // Limpa antes de adicionar

    for (let mes = mesAtual; mes < 12; mes++) {
        // Cria o container do mês
        const section = document.createElement("section");
        section.className = "month-section";

        // Título do mês
        const title = document.createElement("div");
        title.className = "month-title";
        title.textContent = meses[mes];
        section.appendChild(title);

        // Calendário do mês
        const calendar = document.createElement("div");
        calendar.className = "calendar";

        // Cabeçalho dos dias da semana
        const headers = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
        headers.forEach(h => {
            const div = document.createElement("div");
            div.className = "header";
            div.textContent = h;
            calendar.appendChild(div);
        });

        // Descobre o número de dias do mês
        const ultimoDia = new Date(ano, mes + 1, 0).getDate();
        // Descobre o dia da semana do primeiro dia do mês (0=Domingo)
        const primeiroDiaSemana = new Date(ano, mes, 1).getDay();

        // Espaços vazios antes do primeiro dia
        for (let i = 0; i < primeiroDiaSemana; i++) {
            const div = document.createElement("div");
            calendar.appendChild(div);
        }

        // Dias do mês
        for (let dia = 1; dia <= ultimoDia; dia++) {
            let divDia = document.createElement("div");
            divDia.textContent = dia;

            // Só marca como "off-day" se for o mês atual e o dia for menor que hoje
            if (mes === mesAtual && dia < diaHoje)
                divDia.className = "off-day";
            
            else
             divDia.className = "open-day";
            calendar.appendChild(divDia);
        }

        section.appendChild(calendar);
        monthBox.appendChild(section);
    }
}

document.addEventListener("DOMContentLoaded", organizarCalendario);