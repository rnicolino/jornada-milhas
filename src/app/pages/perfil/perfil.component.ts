import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { PessoaUsuaria } from 'src/app/core/types/type';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

    titulo: string = 'Olá ';  
    textoBotao: string = 'Salvar Alterações';
    perfilComponent: boolean = true;

    token = '';
    nome = '';
    cadastro!: PessoaUsuaria;
    form!: FormGroup<any> | null

    constructor(
      private tokenService: TokenService,
      private cadastroService: CadastroService,
      private formularioService: FormularioService,
      private router: Router,
      private userService: UserService
    ) {
      // Simulação de obtenção do token e nome do usuário logado
      this.token = localStorage.getItem('token') || '';
      this.nome = localStorage.getItem('nome') || '';
    }

    ngOnInit() {
      // Implementar lógica para inicializar o componente, como buscar os dados do perfil do usuário
      this.token = this.tokenService.retornarToken();
      this.cadastroService.buscarCadastro().subscribe(cadastro => {
        this.cadastro = cadastro; 
        this.nome = this.cadastro.nome;
        this.carregarFormulario();
        }
      );
    }

    carregarFormulario() {
      // Implementar lógica para carregar os dados do perfil do usuário no formulário, se necessário
      this.form = this.formularioService.getCadastro();
      this.form?.patchValue({
        nome: this.cadastro.nome,
        nascimento: this.cadastro.nascimento,
        cpf: this.cadastro.cpf,
        telefone: this.cadastro.telefone,
        email: this.cadastro.email,
        genero: this.cadastro.genero,
        cidade: this.cadastro.cidade,
        estado: this.cadastro.estado
      });
    }

    deslogar() {
      // Implementar lógica de deslogar, como limpar tokens, redirecionar para a página de login, etc.
      console.log('Logout realizado com sucesso');
      this.userService.logout();
      this.router.navigateByUrl('/login');
    } 

    salvarAlteracoes() {
      // Implementar lógica para salvar as alterações do perfil, como enviar os dados para um serviço de backend, etc.
      const dadosAtualizados: PessoaUsuaria = {
        nome: this.form?.get('nome')?.value,
        nascimento: this.form?.get('nascimento')?.value,
        cpf: this.form?.get('cpf')?.value,
        telefone: this.form?.get('telefone')?.value,
        email: this.form?.get('email')?.value,
        senha: '', // A senha não é atualizada aqui, pode ser tratada separadamente
        genero: this.form?.get('genero')?.value,
        cidade: this.form?.get('cidade')?.value,
        estado: this.form?.get('estado')?.value
      };

      this.cadastroService.editarCadastro(dadosAtualizados).subscribe({
        next: (cadastroAtualizado) => {
          console.log('Perfil atualizado com sucesso:', cadastroAtualizado);
          alert('Perfil atualizado com sucesso!');
          // Atualizar o formulário e os dados do perfil com as informações atualizadas
          this.cadastro = cadastroAtualizado;
          this.carregarFormulario();
          this.router.navigateByUrl('/'); // Redirecionar para a página inicial ou outra página após salvar as alterações
        },
        error: (err) => {
          console.log('Erro ao atualizar o perfil:', err);
        }
      });
    }
}
