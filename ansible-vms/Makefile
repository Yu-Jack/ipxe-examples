.PHONY: install destroy re-install setup-rancher uninstall-rancher

install:
	ansible-playbook -i inventory.yml site.yml -e @vault.yml

destroy:
	ansible-playbook -i inventory.yml destroy.yml -e @vault.yml

re-install:
	$(MAKE) destroy
	$(MAKE) install

setup-rancher:
	ansible-playbook -i inventory.yml setup_rancher.yml -e @vault.yml

uninstall-rancher:
	ansible-playbook -i inventory.yml uninstall_rancher.yml -e @vault.yml