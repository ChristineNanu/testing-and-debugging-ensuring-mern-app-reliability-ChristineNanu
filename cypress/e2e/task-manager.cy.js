describe('Task Manager E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display the task manager interface', () => {
    cy.contains('Task Manager').should('be.visible');
    cy.get('[data-testid="add-task-button"]').should('contain', 'Add Task');
  });

  it('should create a new task', () => {
    // Click Add Task button
    cy.contains('Add Task').click();
    
    // Fill out the form
    cy.get('#title').type('Test Task');
    cy.get('#description').type('This is a test task description');
    cy.get('#priority').select('high');
    
    // Submit the form
    cy.contains('Add Task').click();
    
    // Verify task appears in the list
    cy.contains('Test Task').should('be.visible');
    cy.contains('This is a test task description').should('be.visible');
    cy.get('.task-priority.high').should('be.visible');
  });

  it('should mark a task as complete', () => {
    // First create a task
    cy.contains('Add Task').click();
    cy.get('#title').type('Complete Me');
    cy.contains('Add Task').click();
    
    // Mark it as complete
    cy.contains('Mark Complete').click();
    
    // Verify task is marked as completed
    cy.get('.task-item.completed').should('exist');
    cy.contains('Mark Incomplete').should('be.visible');
  });

  it('should delete a task', () => {
    // First create a task
    cy.contains('Add Task').click();
    cy.get('#title').type('Delete Me');
    cy.contains('Add Task').click();
    
    // Delete the task
    cy.contains('Delete').click();
    
    // Confirm deletion in the alert
    cy.on('window:confirm', () => true);
    
    // Verify task is removed
    cy.contains('Delete Me').should('not.exist');
  });

  it('should handle empty task list', () => {
    // If no tasks exist, should show empty state
    cy.get('.task-list').then(($list) => {
      if ($list.find('.task-item').length === 0) {
        cy.contains('No tasks yet').should('be.visible');
      }
    });
  });

  it('should validate required fields', () => {
    // Try to submit empty form
    cy.contains('Add Task').click();
    cy.get('form').within(() => {
      cy.contains('Add Task').click();
    });
    
    // Should show validation message
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Please enter a task title');
    });
  });

  it('should cancel task creation', () => {
    // Open form and cancel
    cy.contains('Add Task').click();
    cy.get('#title').type('Cancelled Task');
    cy.contains('Cancel').click();
    
    // Form should close and task should not be created
    cy.get('.task-form').should('not.exist');
    cy.contains('Cancelled Task').should('not.exist');
  });

  it('should display task metadata', () => {
    // Create a task with due date
    cy.contains('Add Task').click();
    cy.get('#title').type('Task with Due Date');
    cy.get('#dueDate').type('2024-12-31');
    cy.contains('Add Task').click();
    
    // Verify metadata is displayed
    cy.contains('Created:').should('be.visible');
    cy.contains('Due:').should('be.visible');
  });
});