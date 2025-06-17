import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TabelKelolaAkun from "../../components/TabelKelolaAkun/TabelKelolaAkun";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="Kelola Akun | FIN-GROW"
        description="Halaman kelila akun terdaftar FIN-GROW"
      />
      <PageBreadcrumb pageTitle="Kelola Akun" />
      <div className="space-y-6">
        <ComponentCard title="Akun terdaftar">
          <TabelKelolaAkun />
        </ComponentCard>
      </div>
    </>
  );
}
