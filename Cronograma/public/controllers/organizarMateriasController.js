const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
const celulaDado = document.getElementById("divDados");

const materias = [
    { "Materia": "Português", "Cor": "#FFDD99", "Sequencial": true, "Aulas": 4 },
    { "Materia": "Matemática", "Cor": "#FF9999", "Sequencial": true, "Aulas": 4 },
    { "Materia": "História", "Cor": "#99CCFF", "Sequencial": true, "Aulas": 2 },
    { "Materia": "Geografia", "Cor": "#C1E1C1", "Sequencial": true, "Aulas": 2 },
    { "Materia": "Inglês", "Cor": "#DDA0DD", "Sequencial": true, "Aulas": 4 },
    { "Materia": "Biologia", "Cor": "#A0E7E5", "Sequencial": true, "Aulas": 2 },
    { "Materia": "Física", "Cor": "#B0E0E6", "Sequencial": true, "Aulas": 2 },
    { "Materia": "Química", "Cor": "#FFD1DC", "Sequencial": true, "Aulas": 2 },
    { "Materia": "Artes", "Cor": "#FFD700", "Sequencial": true, "Aulas": 2 },
    { "Materia": "Ed. Física", "Cor": "#98FB98", "Sequencial": true, "Aulas": 2 },
    { "Materia": "Filosofia", "Cor": "#F5DEB3", "Sequencial": true, "Aulas": 2 },
    { "Materia": "Sociologia", "Cor": "#E6E6FA", "Sequencial": true, "Aulas": 2 },
    { "Materia": "Programação", "Cor": "#EFF69A", "Sequencial": true, "Aulas": 6 },
];

const aulasPorDia = 8;
const grade = Array.from({ length: aulasPorDia }, () => Array(dias.length).fill(null));

// Inicializa aulas restantes
materias.forEach(m => m.AulasRestantes = m.Aulas);

// Padrão fixo da semana: duas aulas pela manhã (aula 1 e 2) para determinadas matérias
// Índices no array 'materias'
const padraoManha = {
    0: 1, // Segunda - Matemática
    1: 0, // Terça - Português
    2: 1, // Quarta - Matemática
    3: 0, // Quinta - Português
    4: 4  // Sexta - Inglês
};

// Preenche o padrão fixo da manhã
for (let dia = 0; dia < dias.length; dia++) {
    const idxMateria = padraoManha[dia];
    const materia = materias[idxMateria];
    if (materia.AulasRestantes >= 2) {
        grade[0][dia] = materia;
        grade[1][dia] = materia;
        materia.AulasRestantes -= 2;
    }
}

// Preenche o restante do dia com blocos de 2 aulas
for (let dia = 0; dia < dias.length; dia++) {
    let aula = 2; // Começa a partir da 3ª aula

    // Tenta alocar blocos de 2 aulas
    materias.forEach(materia => {
        while (
            materia.Sequencial &&
            materia.AulasRestantes >= 2 &&
            aula <= aulasPorDia - 2
        ) {
            grade[aula][dia] = materia;
            grade[aula + 1][dia] = materia;
            materia.AulasRestantes -= 2;
            aula += 2;
        }
    });

    // Se sobrar 1 aula, tenta colocar isoladamente
    materias.forEach(materia => {
        if (
            materia.Sequencial &&
            materia.AulasRestantes === 1 &&
            aula < aulasPorDia
        ) {
            grade[aula][dia] = materia;
            materia.AulasRestantes--;
            aula++;
        }
    });
}

// Monta o HTML da tabela
let html = `<table class="grade-horario"><thead><tr><th>Aula</th>`;
dias.forEach(dia => html += `<th>${dia}</th>`);
html += `</tr></thead><tbody>`;

for (let aula = 0; aula < aulasPorDia; aula++) {
    html += `<tr><td>${aula + 1}ª Aula</td>`;
    for (let dia = 0; dia < dias.length; dia++) {
        const materia = grade[aula][dia];
        if (materia) {
          const id = `${materia.Materia}-${aula}-${dia}`;
          const aulaHorario = `${aula + 1}ª Aula`;
          html += `<td class="celula" style="background-color: ${materia.Cor};" onclick="abrirObservacao('${id}', '${materia.Materia}', '${dias[dia]}', '${aulaHorario}')">${materia.Materia}</td>`;

        } else {
            html += `<td class="celula"></td>`;
        }
    }
    html += '</tr>';
}
html += '</tbody></table>';

celulaDado.innerHTML = html;
